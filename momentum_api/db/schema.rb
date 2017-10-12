# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171012023121) do

  create_table "alarms", force: :cascade do |t|
    t.string  "time"
    t.string  "label"
    t.boolean "am"
    t.boolean "sunday"
    t.boolean "monday"
    t.boolean "tuesday"
    t.boolean "wednesday"
    t.boolean "thursday"
    t.boolean "friday"
    t.boolean "saturday"
  end

  create_table "weathers", force: :cascade do |t|
    t.string "city"
  end

  create_table "world_clocks", force: :cascade do |t|
    t.string "city"
  end

end
