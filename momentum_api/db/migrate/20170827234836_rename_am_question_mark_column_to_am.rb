class RenameAmQuestionMarkColumnToAm < ActiveRecord::Migration[5.0]
  def change
    rename_column :alarms, :am?, :am
  end
end
