# Kubernetes Community Days Spain 2023

## Develop

To develop, just run this command and open your browser at http://localhost:1313. When making changes in the code, the website will be automatically regenerated. You just need to refresh the browser.

```bash
docker run -it --rm --name kcd2023 \
  -v $(pwd)/:/root/kcd/ \
  -p 1313:1313 \
  kcd:2023 server --bind "0.0.0.0"
```

## Build

We have containerized the KCDSpain 2023 webpage. To avoid compatibility problems and versions mismatch you can execute and run the website using docker/podman. To do so, make sure you have initialized and pulled the submodules.

```bash
git submodule update --init --force
docker build -t kcd:2023 .
```

## Execute

To execute and serve the website you can run the following command, remember hugo uses the port 1313.

```bash
docker run -p 1313:1313 kcd:2023
```