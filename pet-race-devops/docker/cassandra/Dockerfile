FROM ingenieux/alpine-java8-supervisord

ENV DUMB_INIT_VER=1.0.3 CASS_VERSION=3.5 CASS_DIR=/opt/cassandra

COPY files/ /

RUN echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

RUN set -ex \
  && apk add --no-cache python python-dev jemalloc jemalloc-dev bash procps musl musl-dev \
  && apk add --no-cache --virtual .fetch-deps curl \
  && apk --no-cache add ca-certificates \
  && mv /sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub \
  && apk add --allow-untrusted glibc-2.23-r1.apk \
  && cp /lib/libc.musl-x86_64.so.1 /opt/jdk/lib/amd64/libc.musl-x86_64.so.1 \
  && adduser -S cassandra \
  && mkdir -p /cassandra_data/data \
  && curl "https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VER}/dumb-init_${DUMB_INIT_VER}_amd64" >> /usr/local/bin/dumb-init \
  && curl "http://apache.cs.utah.edu/cassandra/${CASS_VERSION}/apache-cassandra-${CASS_VERSION}-bin.tar.gz" | tar xz \
  && mv apache-cassandra-${CASS_VERSION} ${CASS_DIR} \
  && mv /logback.xml /cassandra.yaml ${CASS_DIR}/conf/ \
  && mkdir -p ${CASS_DIR}/logs \
  && chown -R cassandra: ${CASS_DIR} /cassandra_data /run.sh /kubernetes-cassandra.jar \
  && chmod +x /usr/local/bin/dumb-init /run.sh
#  && apk del .fetch-deps \
#  && rm -rf /var/cache/apk/*

USER cassandra

# 7000: intra-node communication
# 7001: TLS intra-node communication
# 7199: JMX
# 9042: CQL
# 9160: thrift service not included cause it is going away
EXPOSE 7000 7001 7199 9042

CMD ["/usr/local/bin/dumb-init", "/bin/bash", "/run.sh"]
