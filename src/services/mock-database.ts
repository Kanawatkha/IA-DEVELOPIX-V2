import { Product } from "@/src/features/products/types";

export const mockDatabase: { products: Product[] } = {
  products: [
    {
      id: 'prod_1',
      name: 'LINEFOLLOWER (NOFAN)',
      category: 'linefollower',
      price: 249.99,
      description: 'Ultra-lightweight line follower optimized for standard agility tracks.',
      status: 'deploy',
      technicalSpecs: {
        Weight: '145g',
        Agility: 'Maximum',
        Sensor: 'ZR Sonar'
      },
      imagePlaceholder: 'https://picsum.photos/seed/linefollower-nofan/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    },
    {
      id: 'prod_2',
      name: 'LINEFOLLOWER FAN',
      category: 'linefollower',
      price: 349.99,
      description: 'Advanced line follower with downforce fan integration.',
      status: 'coming_soon',
      technicalSpecs: {
        Weight: '180g',
        Downforce: '2kg max',
        Sensor: 'ZR Sonar Pro'
      },
      imagePlaceholder: 'https://picsum.photos/seed/linefollower-fan/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    },
    {
      id: 'prod_3',
      name: 'MISSION',
      category: 'mission',
      price: 899.99,
      description: 'High-precision mission robot built for complex autonomous tasks.',
      status: 'deploy',
      technicalSpecs: {
        Precision: 'High',
        Drive: 'Maxon DCX 12 L'
      },
      imagePlaceholder: 'https://picsum.photos/seed/mission/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    },
    {
      id: 'prod_4',
      name: 'MISSION PRO',
      category: 'mission',
      price: 1499.99,
      description: 'Enterprise-grade mission robot with payload extension.',
      status: 'coming_soon',
      technicalSpecs: {
        Precision: 'Extreme',
        Drive: 'Dual Maxon DCX 12 L',
        Sensors: 'LiDAR + Vision'
      },
      imagePlaceholder: 'https://picsum.photos/seed/mission-pro/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    },
    {
      id: 'prod_5',
      name: 'GATHERING',
      category: 'gathering',
      price: 649.99,
      description: 'Heavy-duty gathering robot capable of swift sorting.',
      status: 'coming_soon',
      technicalSpecs: {
        Payload: '500g',
        Mechanism: 'Dual Gripper'
      },
      imagePlaceholder: 'https://picsum.photos/seed/gathering/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    },
    {
      id: 'prod_6',
      name: 'SUMO',
      category: 'sumo',
      price: 1299.99,
      description: 'Professional grade sumo combat robot with magnetic downforce.',
      status: 'coming_soon',
      technicalSpecs: {
        Class: '3KG Heavyweight',
        Armor: 'Steel & Aluminum',
        Drive: 'Brushless DC'
      },
      imagePlaceholder: 'https://picsum.photos/seed/sumo/800/600',
      '3dModelUrl': '/models/placeholder-sphere.glb'
    }
  ]
};
