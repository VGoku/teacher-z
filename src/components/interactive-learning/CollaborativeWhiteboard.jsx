import React, { useRef, useState, useEffect } from 'react';

const CollaborativeWhiteboard = ({ sessionData, onStartActivity, onParticipantJoin }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const tools = [
    { id: 'pen', icon: '✏️', label: 'Pen' },
    { id: 'eraser', icon: '🧹', label: 'Eraser' },
    { id: 'rectangle', icon: '⬜', label: 'Rectangle' },
    { id: 'circle', icon: '⭕', label: 'Circle' },
    { id: 'line', icon: '📏', label: 'Line' },
    { id: 'text', icon: '📝', label: 'Text' }
  ];

  const colors = [
    '#000000', // Black
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight || 600;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);

    if (currentTool === 'pen' || currentTool === 'eraser') {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : currentColor;
      ctx.lineWidth = currentTool === 'eraser' ? brushSize * 2 : brushSize;
    } else {
      setCurrentShape({
        type: currentTool,
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        color: currentColor,
        size: brushSize
      });
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'pen' || currentTool === 'eraser') {
      const ctx = canvas.getContext('2d');
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (currentShape) {
      setCurrentShape(prev => ({
        ...prev,
        endX: x,
        endY: y
      }));

      // Preview the shape
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawShapes([...shapes, { ...currentShape, endX: x, endY: y }]);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentShape) {
      setShapes(prev => [...prev, currentShape]);
      setCurrentShape(null);
      saveToUndoStack();
    } else {
      saveToUndoStack();
    }
  };

  const drawShapes = (shapesToDraw) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    shapesToDraw.forEach(shape => {
      ctx.beginPath();
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.size;

      switch (shape.type) {
        case 'rectangle':
          ctx.rect(
            shape.startX,
            shape.startY,
            shape.endX - shape.startX,
            shape.endY - shape.startY
          );
          break;
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(shape.endX - shape.startX, 2) +
            Math.pow(shape.endY - shape.startY, 2)
          );
          ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
          break;
        case 'line':
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          break;
        default:
          break;
      }
      ctx.stroke();
    });
  };

  const saveToUndoStack = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setUndoStack(prev => [...prev, canvas.toDataURL()]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const lastState = undoStack[undoStack.length - 1];
    
    setUndoStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, canvas.toDataURL()]);

    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const nextState = redoStack[redoStack.length - 1];
    
    setRedoStack(prev => prev.slice(0, -1));
    setUndoStack(prev => [...prev, canvas.toDataURL()]);

    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    saveToUndoStack();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setShapes([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Collaborative Whiteboard</h2>
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            ↩️ Undo
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            ↪️ Redo
          </button>
          <button
            onClick={clearCanvas}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-4">
        <div className="flex gap-2 items-center">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setCurrentTool(tool.id)}
              className={`p-2 rounded ${
                currentTool === tool.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`w-6 h-6 rounded-full border-2 ${
                currentColor === color ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-700">{brushSize}px</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full bg-white cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Participants */}
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Participants</h3>
        <div className="flex flex-wrap gap-2">
          {sessionData.participants.map(participant => (
            <div
              key={participant.id}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              {participant.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWhiteboard; 