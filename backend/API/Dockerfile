# Use a Python 3.9+ base image
FROM python:3.12

RUN mkdir /app

WORKDIR /app

COPY . /app
RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

