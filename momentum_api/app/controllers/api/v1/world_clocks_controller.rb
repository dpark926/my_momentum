class Api::V1::WorldClocksController < ApplicationController
  def index
    world_clocks = WorldClock.all
    render json: world_clocks
  end

  def create
    world_clock = WorldClock.create(world_clock_params)
    render json: world_clock
  end

  def destroy
    world_clock = WorldClock.find(params[:id])
    world_clock.destroy
    render json: world_clock
  end

  private
  def world_clock_params
    params.require(:world_clock).permit(:city)
  end
end
