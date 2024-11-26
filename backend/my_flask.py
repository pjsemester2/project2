from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import logging
import traceback
import subprocess
import os


app = Flask(__name__)
CORS(app)

def database():
    return mysql.connector.connect(
        host="na424056-001.eu.clouddb.ovh.net",
        user="innov-app1",
        password="Ryr50IUfFm07",
        database="StudentAttendance",
        port=35700
    )
