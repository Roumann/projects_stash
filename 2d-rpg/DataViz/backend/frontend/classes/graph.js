class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  static load(info) {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.point1)),
          points.find((p) => p.equals(i.point2))
        )
    );
    return new Graph(points, segments);
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  clearGraph() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }

  addPoint(point) {
    this.points.push(point);
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    } else {
      return false;
    }
  }

  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point);
    for (const segment of segments) {
      this.removeSegment(segment);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  tryAddSegment(segment) {
    if (
      !this.containsSegment(segment) &&
      !segment.point1.equals(segment.point2)
    ) {
      this.addSegment(segment);
      return true;
    } else {
      return false;
    }
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point) {
    const segments = [];

    for (const segment of this.segments) {
      if (segment.includes(point)) {
        segments.push(segment);
      }
    }
    return segments;
  }
}
