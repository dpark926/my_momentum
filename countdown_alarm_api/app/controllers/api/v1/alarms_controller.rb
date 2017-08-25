class Api::V1::AlarmsController < ApplicationController
  def index
    alarms = Alarm.all
    render json: alarms
  end

  def create
    alarm = Alarm.create(alarm_params)
    render json: alarm
  end

  private
  def alarm_params
    params.require(:alarm).permit(:time, :label, :am?, :sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday)
  end
end
