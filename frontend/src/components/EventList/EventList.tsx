import type { Event } from '../../types/types'
import './EventList.css'

interface EventListProps {
	events: Event[]
}

export default function EventList({ events }: EventListProps) {
	if (events.length === 0) {
		return <div className="no-events">No events yet</div>
	}

	return (
		<div className="event-list-container">
			<h3>Event History</h3>
			<div className="events-grid">
				{events.map((event) => (
					<div key={event.id} className="event-card">
						<div className="event-type">{event.type}</div>
						<p><strong>Description:</strong> {event.description}</p>
						<p><strong>Date:</strong> {event.event_date}</p>
					</div>
				))}
			</div>
		</div>
	)
}
