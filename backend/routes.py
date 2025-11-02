from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import tensorflow as tf
import cv2, os, uuid

app = Flask(__name__)
CORS(app, origins="*")

model = load_model("pneuvision_final.h5")
IMG_SIZE = 224

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
RESULT_FOLDER = os.path.join(BASE_DIR, "results")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

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

    heatmap = generate_gradcam(img_array)
    orig = cv2.imread(file_path)
    orig = cv2.resize(orig, (IMG_SIZE, IMG_SIZE))
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(orig, 0.6, heatmap_color, 0.4, 0)

    result_path = os.path.join(RESULT_FOLDER, filename)
    cv2.imwrite(result_path, overlay)

    return jsonify({
        "label": label,
        "confidence": confidence,
        "image_path": f"/results/{filename}"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
