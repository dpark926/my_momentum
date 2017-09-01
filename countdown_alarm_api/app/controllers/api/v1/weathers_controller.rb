class Api::V1::WeathersController < ApplicationController
  def index
    weathers = Weather.all
    render json: weathers
  end

  def create
    weather = Weather.create(weather_params)
    render json: weather
  end

  def destroy
    weather = Weather.find(params[:id])
    weather.destroy
    render json: weather
  end

  private
  def weather_params
    params.require(:weather).permit(:city)
  end
end
