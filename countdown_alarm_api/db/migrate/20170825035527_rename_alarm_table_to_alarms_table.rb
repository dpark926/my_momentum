class RenameAlarmTableToAlarmsTable < ActiveRecord::Migration[5.0]
  def change
    rename_table :alarm, :alarms
  end
end
