import cv2
from scripts.video_to_skeleton import *
import os
from tensorflow.keras import backend as Ktr
from tensorflow.keras.layers import *
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import *
from tensorflow.keras.callbacks import *
import tensorflow as tf
import pickle
import gin
from tqdm import tqdm
#import gctr
from pathlib import Path
import glob
import cv2
import matplotlib.pyplot as plt
import os
import random
import math
import numpy as np
# gin.enter_interactive_mode()
def script():
    classes = {0: "Здравствуйте", 1: "Привет", 2: "У меня все очень плохо", 3: "Я смотрю телевизор"}

    from modules import translator
    gin.parse_config_file('configs/translator_train.gin')
    gin.parse_config_file('configs/utils.gin')

    skeleton_dir = "sklnt"#"sentence_skeleton"#"skltn"#"skeleton_dir"
    checkpoint = "checkpoints/translator/2h20220915.h5"
    target_epoch = 30
    steps_per_epoch = 50


    h5_glosses = [p.stem for p in Path(skeleton_dir).glob("*.h5")]
    LABELS = {}
    for i, g in enumerate(h5_glosses):
        LABELS[g] = [i, g]
    N_CLASSES = len(LABELS.keys())
    print("N_CLASSES", N_CLASSES)

    import json
    with open("configs/labels.gin", "w") as f:
        dump_dict = json.dumps(LABELS, indent=0,separators=(',', ':'))
        f.writelines(f"LABELS = {dump_dict}\n")    
        f.writelines(f"N_CLASSES = {4}")#{N_CLASSES}")

    gin.parse_config_file('configs/translator_train.gin')
    gin.parse_config_file('configs/utils.gin')

    model = translator.get_model()
    batch_size = 1#model.outputs[0].shape[0]
    n_feats = model.outputs[0].shape[1]
    n_classes = model.outputs[1].shape[1]
    print("batch_size:", batch_size)
    print("n_feats:", n_feats)
    print("n_classes:", n_classes)

    if checkpoint is not None:
        model.load_weights(checkpoint)


    # recorder()


    main(Path("videos"), Path("sklnt"))

    # os.remove("sklnt/class.h5")


    os.remove("videos/class/blob.mp4")



    train_generator = translator.DataGenerator(skeleton_dir)


    inputs, y_true = train_generator.__getitem__(10, None)
    feats_pred, cls_pred = model(inputs, training = False)
    print(classes[np.argmax(cls_pred)])