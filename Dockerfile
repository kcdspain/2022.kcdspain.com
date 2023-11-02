FROM node:18.9-alpine3.15
ARG WORKDIR=/root/kcd

COPY ./archetypes ${WORKDIR}/archetypes
COPY ./content ${WORKDIR}/content
COPY ./data ${WORKDIR}/data
COPY ./i18n ${WORKDIR}/i18n
COPY ./layouts ${WORKDIR}/layouts
COPY ./static ${WORKDIR}/static
COPY ./themes ${WORKDIR}/themes
COPY ./.gitmodules ./config.toml ./icons.js ./package.json ./package-lock.json ./Makefile ./postcss.config.js ${WORKDIR}

RUN apk add hugo make python3 build-base git && cd ${WORKDIR} && git init && \
    npm install && git submodule update -f --init --recursive

WORKDIR ${WORKDIR}
ENTRYPOINT [ "hugo" ]
CMD [ "server", "--disableLiveReload", "--bind", "0.0.0.0" ]
