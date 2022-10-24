FROM amazonlinux:2
ENV VERSION_NODE=12.10.0
ENV HTTP_PROXY=""
ENV HTTPS_PROXY=""
RUN touch ~/.bashrc
RUN yum -y update && \
    yum -y install \
    curl \
    git \
    tar \
    openssl \
    yum clean all && \
    rm -rf /var/cache/yum
RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
RUN yum -y install nodejs
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
RUN /bin/bash -c ". ~/.nvm/nvm.sh && \
    nvm install $VERSION_NODE && nvm use $VERSION_NODE && \
    nvm alias default node && nvm cache clear"

RUN echo export PATH="\
    /root/.nvm/versions/node/${VERSION_NODE}/bin:\
    $PATH" >> ~/.bashrc && \
    echo "nvm use ${VERSION_NODE} 1> /dev/null" >> ~/.bashrc

COPY ./package* .
RUN npm ci

ENTRYPOINT [ "bash", "-c" ]
