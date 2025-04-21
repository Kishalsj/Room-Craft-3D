import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PanelRight, Move, Palette, Minus, Plus, X, Save, Download, Share, RotateCcw, Sofa as SofaIcon, Square, Monitor } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThreeCanvas, Room, Chair, Table, Sofa, TV } from '../components/three/ThreeCanvas';

interface FurnitureItem {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  dimensions?: {
    width?: number;
    height?: number;
    length?: number;
  };
}

interface RoomSettings {
  width: number;
  length: number;
  height: number;
  floorColor: string;
  wallColor: string;
}

const RoomCustomizer: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'room' | 'furniture' | 'edit'>('room');
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    width: 8,
    length: 8,
    height: 3,
    floorColor: '#E0E0E0',
    wallColor: '#F5F5F5'
  });
  
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);

  useEffect(() => {
    document.title = mode === 'default' 
      ? 'RoomCraft3D - Customize Default Room' 
      : 'RoomCraft3D - Build from Scratch';
    
    // Setup default furniture if in default mode
    if (mode === 'default') {
      setFurniture([
        {
          id: 'sofa-1',
          type: 'sofa',
          position: [0, 0, 2],
          rotation: [0, 180, 0],
          color: '#4169E1'
        },
        {
          id: 'table-1',
          type: 'table',
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          color: '#8B4513',
          dimensions: {
            width: 1.2,
            length: 0.8,
            height: 0.75
          }
        },
        {
          id: 'chair-1',
          type: 'chair',
          position: [0.8, 0, 0],
          rotation: [0, -90, 0],
          color: '#A0522D'
        },
        {
          id: 'chair-2',
          type: 'chair',
          position: [-0.8, 0, 0],
          rotation: [0, 90, 0],
          color: '#A0522D'
        },
        {
          id: 'tv-1',
          type: 'tv',
          position: [0, 1, -3],
          rotation: [0, 0, 0],
          color: '#000000'
        }
      ]);
    }
  }, [mode]);

  const toggleControls = () => {
    setIsControlsOpen(!isControlsOpen);
  };

  const handleAddFurniture = (type: string) => {
    const newItem: FurnitureItem = {
      id: `${type}-${Date.now()}`,
      type,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      color: type === 'sofa' ? '#4169E1' : type === 'table' ? '#8B4513' : '#A0522D',
    };

    if (type === 'table') {
      newItem.dimensions = {
        width: 1.2,
        length: 0.8,
        height: 0.75
      };
    }

    setFurniture([...furniture, newItem]);
    setSelectedFurniture(newItem.id);
    setActiveTab('edit');
  };

  const handleSelectFurniture = (id: string) => {
    setSelectedFurniture(id);
    setActiveTab('edit');
  };

  const handleUpdatePosition = (id: string, axis: 'x' | 'y' | 'z', value: number) => {
    setFurniture(furniture.map(item => {
      if (item.id === id) {
        const newPosition = [...item.position] as [number, number, number];
        if (axis === 'x') newPosition[0] = value;
        if (axis === 'y') newPosition[1] = value;
        if (axis === 'z') newPosition[2] = value;
        return {
          ...item,
          position: newPosition
        };
      }
      return item;
    }));
  };

  const handleUpdateRotation = (id: string, axis: 'x' | 'y' | 'z', value: number) => {
    setFurniture(furniture.map(item => {
      if (item.id === id) {
        const newRotation = [...item.rotation] as [number, number, number];
        if (axis === 'x') newRotation[0] = value;
        if (axis === 'y') newRotation[1] = value;
        if (axis === 'z') newRotation[2] = value;
        return {
          ...item,
          rotation: newRotation
        };
      }
      return item;
    }));
  };

  const handleUpdateColor = (id: string, color: string) => {
    setFurniture(furniture.map(item => {
      if (item.id === id) {
        return {
          ...item,
          color
        };
      }
      return item;
    }));
  };

  const handleRemoveFurniture = (id: string) => {
    setFurniture(furniture.filter(item => item.id !== id));
    setSelectedFurniture(null);
  };

  const renderFurnitureComponent = (item: FurnitureItem) => {
    switch (item.type) {
      case 'chair':
        return (
          <Chair
            key={item.id}
            position={item.position}
            rotation={item.rotation}
            color={item.color}
          />
        );
      case 'table':
        return (
          <Table
            key={item.id}
            position={item.position}
            rotation={item.rotation}
            color={item.color}
            width={item.dimensions?.width}
            length={item.dimensions?.length}
            height={item.dimensions?.height}
          />
        );
      case 'sofa':
        return (
          <Sofa
            key={item.id}
            position={item.position}
            rotation={item.rotation}
            color={item.color}
          />
        );
      case 'tv':
        return (
          <TV
            key={item.id}
            position={item.position}
            rotation={item.rotation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="flex h-full">
          {/* 3D Canvas */}
          <div className={`flex-grow transition-all duration-300 ${isControlsOpen ? 'mr-80' : ''}`}>
            <div className="w-full h-screen">
              <ThreeCanvas>
                <Room
                  width={roomSettings.width}
                  length={roomSettings.length}
                  height={roomSettings.height}
                  floorColor={roomSettings.floorColor}
                  wallColor={roomSettings.wallColor}
                />
                {furniture.map(item => renderFurnitureComponent(item))}
              </ThreeCanvas>
            </div>
          </div>
          
          {/* Controls Panel */}
          <motion.div
            className="fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg z-40 overflow-y-auto"
            initial={{ width: 320, x: 0 }}
            animate={{ 
              width: 320,
              x: isControlsOpen ? 0 : 320
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {mode === 'default' ? 'Customize Default Room' : 'Build from Scratch'}
                </h2>
                <button 
                  onClick={toggleControls}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <PanelRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex mt-4 border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'room' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => {
                    setActiveTab('room');
                    setSelectedFurniture(null);
                  }}
                >
                  Room
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'furniture' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => {
                    setActiveTab('furniture');
                    setSelectedFurniture(null);
                  }}
                >
                  Add Items
                </button>
                {selectedFurniture && (
                  <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('edit')}
                  >
                    Edit Item
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-4">
              {/* Room Settings */}
              {activeTab === 'room' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Room Dimensions</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Width: {roomSettings.width}m
                        </label>
                        <input
                          type="range"
                          min="4"
                          max="12"
                          step="0.5"
                          value={roomSettings.width}
                          onChange={(e) => setRoomSettings({
                            ...roomSettings,
                            width: parseFloat(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Length: {roomSettings.length}m
                        </label>
                        <input
                          type="range"
                          min="4"
                          max="12"
                          step="0.5"
                          value={roomSettings.length}
                          onChange={(e) => setRoomSettings({
                            ...roomSettings,
                            length: parseFloat(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height: {roomSettings.height}m
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="4"
                          step="0.1"
                          value={roomSettings.height}
                          onChange={(e) => setRoomSettings({
                            ...roomSettings,
                            height: parseFloat(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Room Colors</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Floor Color
                        </label>
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-md mr-3 border border-gray-300 shadow-sm"
                            style={{ backgroundColor: roomSettings.floorColor }}
                          />
                          <input
                            type="color"
                            value={roomSettings.floorColor}
                            onChange={(e) => setRoomSettings({
                              ...roomSettings,
                              floorColor: e.target.value
                            })}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Wall Color
                        </label>
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-md mr-3 border border-gray-300 shadow-sm"
                            style={{ backgroundColor: roomSettings.wallColor }}
                          />
                          <input
                            type="color"
                            value={roomSettings.wallColor}
                            onChange={(e) => setRoomSettings({
                              ...roomSettings,
                              wallColor: e.target.value
                            })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add Furniture */}
              {activeTab === 'furniture' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Add Furniture</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'sofa', label: 'Sofa', icon: <SofaIcon className="w-6 h-6" /> },
                      { id: 'table', label: 'Table', icon: <Square className="w-6 h-6" /> },
                      { id: 'chair', label: 'Chair', icon: <SofaIcon className="w-6 h-6" /> },
                      { id: 'tv', label: 'TV', icon: <Monitor className="w-6 h-6" /> }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAddFurniture(item.id)}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center"
                      >
                        <div className="mb-2 text-blue-600">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  {furniture.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Current Items</h3>
                      <div className="space-y-2">
                        {furniture.map((item) => (
                          <div 
                            key={item.id}
                            onClick={() => handleSelectFurniture(item.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedFurniture === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div 
                                  className="w-6 h-6 rounded-full mr-3"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="font-medium capitalize">{item.type}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFurniture(item.id);
                                }}
                                className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Edit Furniture */}
              {activeTab === 'edit' && selectedFurniture && (
                <div>
                  {furniture.filter(item => item.id === selectedFurniture).map((item) => (
                    <div key={item.id} className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold capitalize">{item.type}</h3>
                        <button
                          onClick={() => handleRemoveFurniture(item.id)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                          <Move className="w-4 h-4 mr-2" /> Position
                        </h4>
                        <div className="space-y-3">
                          {['x', 'y', 'z'].map((axis, index) => (
                            <div key={axis} className="flex items-center">
                              <span className="w-8 text-center font-mono text-gray-700 mr-2">
                                {axis.toUpperCase()}
                              </span>
                              <button
                                onClick={() => handleUpdatePosition(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  item.position[index] - 0.1
                                )}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="range"
                                min={axis === 'y' ? 0 : -5}
                                max={axis === 'y' ? 3 : 5}
                                step="0.1"
                                value={item.position[index]}
                                onChange={(e) => handleUpdatePosition(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  parseFloat(e.target.value)
                                )}
                                className="flex-grow mx-2"
                              />
                              <button
                                onClick={() => handleUpdatePosition(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  item.position[index] + 0.1
                                )}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-right font-mono text-xs text-gray-500">
                                {item.position[index].toFixed(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                          <RotateCcw className="w-4 h-4 mr-2" /> Rotation
                        </h4>
                        <div className="space-y-3">
                          {['x', 'y', 'z'].map((axis, index) => (
                            <div key={axis} className="flex items-center">
                              <span className="w-8 text-center font-mono text-gray-700 mr-2">
                                {axis.toUpperCase()}
                              </span>
                              <button
                                onClick={() => handleUpdateRotation(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  item.rotation[index] - 15
                                )}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="359"
                                step="15"
                                value={item.rotation[index]}
                                onChange={(e) => handleUpdateRotation(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  parseFloat(e.target.value)
                                )}
                                className="flex-grow mx-2"
                              />
                              <button
                                onClick={() => handleUpdateRotation(
                                  item.id,
                                  axis as 'x' | 'y' | 'z',
                                  item.rotation[index] + 15
                                )}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-right font-mono text-xs text-gray-500">
                                {item.rotation[index]}°
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                          <Palette className="w-4 h-4 mr-2" /> Color
                        </h4>
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-md mr-3 border border-gray-300 shadow-sm"
                            style={{ backgroundColor: item.color }}
                          />
                          <input
                            type="color"
                            value={item.color}
                            onChange={(e) => handleUpdateColor(item.id, e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Bottom Actions */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                  <button className="btn-secondary !py-1.5 text-sm flex items-center justify-center">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button className="btn-secondary !py-1.5 text-sm flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                  <button className="btn-secondary !py-1.5 text-sm flex items-center justify-center">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Toggle Controls Button (Mobile) */}
          <button
            className={`fixed bottom-4 right-4 md:hidden p-3 rounded-full shadow-lg z-50 ${
              isControlsOpen ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
            }`}
            onClick={toggleControls}
          >
            <PanelRight className="w-6 h-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoomCustomizer;