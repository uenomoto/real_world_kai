# frozen_string_literal: true

module Api
  module V1
    class HealthCheckController < ApplicationController
      def index
        render json: { message: 'OK' }, status: :ok
      end
    end
  end
end
