export interface Product {
    id: string;
    name: string;
    category: 'linefollower' | 'mission' | 'gathering' | 'sumo';
    price: number;
    description: string;
    status: 'deploy' | 'coming_soon';
    technicalSpecs: Record<string, string>;
    imagePlaceholder: string;
    '3dModelUrl': string;
}
