class CreateWorldClocks < ActiveRecord::Migration[5.0]
  def change
    create_table :world_clocks do |t|
      t.string :city
    end
  end
end
