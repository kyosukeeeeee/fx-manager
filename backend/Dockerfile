FROM ruby:3.2.3

# 必要なパッケージ（Node, Postgresクライアントなど）
RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Gem を先にインストール（キャッシュ効かせる）
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリ本体コピー
COPY . .

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails db:prepare && bundle exec rails s -p 3000 -b '0.0.0.0'"]
