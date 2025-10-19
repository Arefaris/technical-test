export type Animal = {
    id: string,
    name: string,
    species: string,
    birth_date: string,
    created_at: string,
    updated_at: string
}

export type Event = {
    id: string,
    animal_id: string,
    type: 'Visit' | 'Treatment' | 'Observation',
    description: string,
    event_date: string,
    created_at?: string,
    updated_at?: string
}

export type AnimalWithEvents = Animal & {
    events: Event[]
}
