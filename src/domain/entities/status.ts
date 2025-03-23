import { Entity } from "../../core/entities/entity";

export interface StatusProps {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  description: string;
  value: number | null;
  name: string | null;
}

export class Status extends Entity<StatusProps> {
  get id() {
    return this.props.id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get description() {
    return this.props.description;
  }

  get value() {
    return this.props.value;
  }

  get name() {
    return this.props.name;
  }

  static create(props: StatusProps) {
    const status = new Status(props);
    return status;
  }
}
