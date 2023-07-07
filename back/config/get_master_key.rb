require 'aws-sdk-ssm'

ssm = Aws::SSM::Client.new(region: 'ap-northeast-1')
resp = ssm.get_parameter(name: '/myapp/database/key', with_decryption: true)
ENV['RAILS_MASTER_KEY'] = resp.parameter.value

puts "Retrieved key: #{ENV['RAILS_MASTER_KEY']}"