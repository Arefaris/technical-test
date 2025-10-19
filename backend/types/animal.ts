export interface Animal {
	id?: number
	name: string
	species: string
	birth_date: string
	created_at?: string
	updated_at?: string
}

export interface AnimalWithEvents extends Animal {
	events: Event[]
}

export interface Event {
	id?: number
	animal_id: number
	type: string
	description: string
	event_date: string
	created_at?: string
	updated_at?: string
}
