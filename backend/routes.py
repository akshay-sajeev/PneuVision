from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import tensorflow as tf
import cv2, os, uuid, json
from datetime import datetime

app = Flask(__name__)
CORS(app, origins="*")

model = load_model("pneuvision_final.h5")
IMG_SIZE = 224

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
RESULT_FOLDER = os.path.join(BASE_DIR, "results")
HISTORY_FILE = os.path.join(BASE_DIR, "history.json")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# Create history.json if missing
if not os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "w") as f:
        json.dump([], f)

@app.route("/results/<filename>")
def get_result_image(filename):
    return send_from_directory(RESULT_FOLDER, filename)

def preprocess_image(file_path):
    img = image.load_img(file_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def generate_gradcam(img_array):
    conv_layers = [layer.name for layer in model.layers if isinstance(layer, tf.keras.layers.Conv2D)]

    if not conv_layers:
        for layer in model.layers:
            if hasattr(layer, "layers"):
                conv_layers += [l.name for l in layer.layers if isinstance(l, tf.keras.layers.Conv2D)]

    if not conv_layers:
        raise ValueError("No Conv2D layers found in model!")

    last_conv = conv_layers[-1]
    print(f"Using last convolutional layer: {last_conv}")

    grad_model = tf.keras.models.Model(
        [model.inputs],
        [model.get_layer(last_conv).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array, training=False)
        loss = tf.reduce_max(predictions, axis=1)

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)
    heatmap = np.maximum(heatmap, 0)
    heatmap /= np.max(heatmap) + 1e-8
    heatmap = cv2.resize(heatmap, (224, 224))
    return np.uint8(255 * heatmap)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = str(uuid.uuid4()) + ".jpg"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    img_array = preprocess_image(file_path)
    pred = model.predict(img_array)[0][0]
    label = "Pneumonia" if pred >= 0.718 else "Normal"
    confidence = round(float(pred if pred >= 0.5 else 1 - pred) * 100, 2)

    # Generate heatmap
    heatmap = generate_gradcam(img_array)
    orig = cv2.imread(file_path)
    orig = cv2.resize(orig, (IMG_SIZE, IMG_SIZE))
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(orig, 0.6, heatmap_color, 0.4, 0)

    result_path = os.path.join(RESULT_FOLDER, filename)
    cv2.imwrite(result_path, overlay)

    entry = {
        "filename": filename,
        "label": label,
        "confidence": confidence,
        "timestamp": datetime.now().isoformat(),
        "image_path": f"/results/{filename}"
    }

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)

    history.append(entry)

    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)

    return jsonify(entry)

@app.route("/history", methods=["GET"])
def history():
    if not os.path.exists(HISTORY_FILE):
        return jsonify([])

    with open(HISTORY_FILE, "r") as f:
        data = json.load(f)

    return jsonify(data)

@app.route("/compare", methods=["POST"])
def compare():
    if "file1" not in request.files or "file2" not in request.files:
        return jsonify({"error": "Two files required"}), 400

    file1 = request.files["file1"]
    file2 = request.files["file2"]

    # Save uploads
    name1 = str(uuid.uuid4()) + ".jpg"
    name2 = str(uuid.uuid4()) + ".jpg"
    path1 = os.path.join(UPLOAD_FOLDER, name1)
    path2 = os.path.join(UPLOAD_FOLDER, name2)
    file1.save(path1)
    file2.save(path2)

    # Preprocess both
    img1 = preprocess_image(path1)
    img2 = preprocess_image(path2)

    # Predictions
    pred1 = model.predict(img1)[0][0]
    pred2 = model.predict(img2)[0][0]

    label1 = "Pneumonia" if pred1 >= 0.718 else "Normal"
    label2 = "Pneumonia" if pred2 >= 0.718 else "Normal"

    conf1 = round(float(pred1 if pred1 >= 0.5 else 1 - pred1) * 100, 2)
    conf2 = round(float(pred2 if pred2 >= 0.5 else 1 - pred2) * 100, 2)

    # Grad-CAM heatmaps for both
    heat1 = generate_gradcam(img1)
    heat2 = generate_gradcam(img2)

    orig1 = cv2.resize(cv2.imread(path1), (IMG_SIZE, IMG_SIZE))
    orig2 = cv2.resize(cv2.imread(path2), (IMG_SIZE, IMG_SIZE))

    heatmap1 = cv2.applyColorMap(heat1, cv2.COLORMAP_JET)
    heatmap2 = cv2.applyColorMap(heat2, cv2.COLORMAP_JET)

    overlay1 = cv2.addWeighted(orig1, 0.6, heatmap1, 0.4, 0)
    overlay2 = cv2.addWeighted(orig2, 0.6, heatmap2, 0.4, 0)

    result1 = os.path.join(RESULT_FOLDER, name1)
    result2 = os.path.join(RESULT_FOLDER, name2)

    cv2.imwrite(result1, overlay1)
    cv2.imwrite(result2, overlay2)

    return jsonify({
        "scan1": {
            "label": label1,
            "confidence": conf1,
            "image_path": f"/results/{name1}"
        },
        "scan2": {
            "label": label2,
            "confidence": conf2,
            "image_path": f"/results/{name2}"
        }
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
