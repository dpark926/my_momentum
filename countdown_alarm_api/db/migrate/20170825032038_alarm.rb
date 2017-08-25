class Alarm < ActiveRecord::Migration[5.0]
  def change
    create_table :alarm do |t|
      t.string :time
      t.string :label
      t.boolean :am?
      t.boolean :sunday
      t.boolean :monday
      t.boolean :tuesday
      t.boolean :wednesday
      t.boolean :thursday
      t.boolean :friday
      t.boolean :saturday
    end
  end
end
