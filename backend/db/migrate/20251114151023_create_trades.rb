class CreateTrades < ActiveRecord::Migration[8.0]
  def change
    create_table :trades do |t|
      t.string :symbol
      t.string :side
      t.decimal :lot_size
      t.decimal :net_profit

      t.timestamps
    end
  end
end
