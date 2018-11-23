#!/usr/bin/python
import numpy as np
import cv2
import inspect
from sys import argv


def print_methods(obj):
    method_entries = inspect.getmembers(obj, predicate=inspect.isroutine);
    for v in method_entries:
        print v[0]


def create_window(window_name, img):
    [w,h,c] = img.shape;

    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL);
    #Apparently some kludge needed for gtk
    cv2.startWindowThread();

    cv2.imshow(window_name, img);
    cv2.resizeWindow(window_name, w, h);


def main():
    print argv[1];

    create_window('image', cv2.imread(argv[1]));

    cv2.waitKey(0);
    cv2.destroyAllWindows();


if __name__ == "__main__":
    main()
