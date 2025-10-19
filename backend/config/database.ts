import knex from "knex"

const db = knex({
	client: "sqlite3",
	connection: {
		filename: "./database.sqlite"
	},
	useNullAsDefault: true
})

//db setup incase database.sqlite not present
export const initDatabase = async () => {
	try {
		
		const hasAnimalsTable = await db.schema.hasTable("animals")
		if (!hasAnimalsTable) {
			await db.schema.createTable("animals", (table) => {
				table.increments("id").primary()
				table.string("name").notNullable()
				table.string("species").notNullable()
				table.date("birth_date").notNullable()
				table.timestamps(true, true)
			})
			console.log("Table 'animals' created")
		}

		
		const hasEventsTable = await db.schema.hasTable("events")
		if (!hasEventsTable) {
			await db.schema.createTable("events", (table) => {
				table.increments("id").primary()
				table.integer("animal_id").unsigned().notNullable()
				table.string("type").notNullable()
				table.text("description")
				table.date("event_date").notNullable()
				table.timestamps(true, true)

		
				table.foreign("animal_id").references("id").inTable("animals").onDelete("CASCADE")
			})
			console.log("Table 'events' created")
		}

		console.log("Database initialized successfully")
	} catch (error) {
		console.error("Database initialization error:", error)
		throw error
	}
}

export default db
