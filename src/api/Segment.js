import Point from '@/api/Point';

export default class Segment {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  getEnd() {
    return this.end;
  }

  getCrossPoint(segment) {
    const point1 = this.getStart();
    const point2 = this.getEnd();
    const point3 = segment.getStart();
    const point4 = segment.getEnd();

    const x1 = point1.getX();
    const y1 = point1.getY();

    const x2 = point2.getX();
    const y2 = point2.getY();

    const x3 = point3.getX();
    const y3 = point3.getY();

    const x4 = point4.getX();
    const y4 = point4.getY();

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    const xNumer = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    const x = xNumer / denom;
    const yNumer = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
    const y = yNumer / denom;
    if (denom === 0) {
      return false;
    }

    return new Point(x, y);
  }
}
