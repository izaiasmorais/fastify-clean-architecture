export abstract class Entity<Props> {
	protected props: Props;

	protected constructor(props: Props) {
		this.props = props;
	}

	public equals(entity: Entity<unknown>) {
		if (entity === this) {
			return true;
		}

		return false;
	}
}
