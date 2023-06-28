FROM ruby:3.2.0
RUN apt-get update -qq && apt-get install -y build-essential \
  libpq-dev \
  postgresql-client

WORKDIR /real_world_api

ADD Gemfile /real_world_api/Gemfile
ADD Gemfile.lock /real_world_api/Gemfile.lock

RUN bundle install
ADD . /real_world_api

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]
