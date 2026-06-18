FROM ubuntu:latest
LABEL authors="yoxan"

ENTRYPOINT ["top", "-b"]