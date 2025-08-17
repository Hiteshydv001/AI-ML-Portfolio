// Simple shape detection based on edge detection and shape characteristics
export interface Recognition {
  label: string;
  confidence: number;
}

interface Point {
  x: number;
  y: number;
}

export function analyzeDrawing(imageData: ImageData): Recognition[] {
  const { width, height, data } = imageData;
  
  // Find boundaries of the drawing
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let points: Point[] = [];
  
  // Scan for drawn pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 0 && (data[i] < 200 || data[i + 1] < 200 || data[i + 2] < 200)) {
        points.push({ x, y });
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (points.length < 100) {
    return [];
  }

  // Calculate shape metrics
  const drawingWidth = maxX - minX;
  const drawingHeight = maxY - minY;
  const aspectRatio = drawingWidth / drawingHeight;
  const area = drawingWidth * drawingHeight;
  const density = points.length / area;

  // Calculate circularity
  const centerX = (maxX + minX) / 2;
  const centerY = (maxY + minY) / 2;
  const radius = Math.sqrt(drawingWidth * drawingWidth + drawingHeight * drawingHeight) / 2;
  
  let circlePoints = 0;
  points.forEach(p => {
    const distance = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
    if (Math.abs(distance - radius) < radius * 0.2) {
      circlePoints++;
    }
  });
  
  const circularity = circlePoints / points.length;

  // Calculate straightness (for lines and rectangles)
  const edges = countStraightEdges(points);

  // Return predictions based on shape characteristics
  const predictions: Recognition[] = [];

  if (circularity > 0.6) {
    predictions.push({ label: "circle", confidence: circularity });
    predictions.push({ label: "sun", confidence: circularity * 0.8 });
  } else if (edges >= 4 && Math.abs(aspectRatio - 1) < 0.2) {
    predictions.push({ label: "square", confidence: 0.9 });
    predictions.push({ label: "window", confidence: 0.7 });
  } else if (edges >= 4 && aspectRatio > 1.2) {
    predictions.push({ label: "rectangle", confidence: 0.85 });
    predictions.push({ label: "door", confidence: 0.7 });
  } else if (edges >= 3 && edges < 4) {
    predictions.push({ label: "triangle", confidence: 0.85 });
    predictions.push({ label: "mountain", confidence: 0.7 });
  } else if (aspectRatio > 2) {
    predictions.push({ label: "line", confidence: 0.9 });
    predictions.push({ label: "road", confidence: 0.7 });
  } else {
    predictions.push({ label: "drawing", confidence: 0.5 });
  }

  return predictions.sort((a, b) => b.confidence - a.confidence);
}

function countStraightEdges(points: Point[]): number {
  if (points.length < 3) return 0;

  let edges = 0;
  let straightSegments = 0;
  const segmentLength = 10;

  for (let i = 0; i < points.length - segmentLength; i += segmentLength) {
    const dx = points[i + segmentLength].x - points[i].x;
    const dy = points[i + segmentLength].y - points[i].y;
    const angle = Math.atan2(dy, dx);

    // Count segments that are approximately horizontal or vertical
    if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI/2) < 0.1) {
      straightSegments++;
    } else {
      if (straightSegments > 5) {
        edges++;
      }
      straightSegments = 0;
    }
  }

  return edges;
}
