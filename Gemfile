source 'https://rubygems.org'

ruby '2.2.3'

gem 'rails', '4.2.5.2'
gem 'rails-api'
gem 'pg'
gem 'puma'
gem 'jquery-rails'
gem 'therubyracer'
gem 'httparty'

group :development do
  gem 'web-console', '~> 3.1.1'
  gem 'spring'
  gem 'spring-commands-rspec'
end

group :test do
  gem 'webmock'
  gem "codeclimate-test-reporter", require: nil
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'awesome_print'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'capybara'
  gem 'dotenv-rails'
  gem 'bundler-audit', require: false

  # Access an IRB console on exception pages or by using <%= console %> in views
  # gem 'web-console', '~> 2.0'
end


group :production do
  gem 'rails_12factor'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'
