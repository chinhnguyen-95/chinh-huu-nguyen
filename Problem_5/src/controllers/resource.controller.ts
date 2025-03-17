import { Request, Response } from 'express';
import { prisma } from '../app';

export const createResource = async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body;
        const resource = await prisma.resource.create({
            data: { name, type },
        });
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create resource' });
    }
};

export const getResources = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const filters = name ? { where: { name: { contains: name as string } } } : {};
        // @ts-ignore
        const resources = await prisma.resource.findMany(filters);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
};

export const getResourceById = async (req: Request, res: Response) => {
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: Number(req.params.id) },
        });
        resource ? res.json(resource) : res.status(404).json({ error: 'Not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
};

export const updateResource = async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body;
        const resource = await prisma.resource.update({
            where: { id: Number(req.params.id) },
            data: { name, type },
        });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update resource' });
    }
};

export const deleteResource = async (req: Request, res: Response) => {
    try {
        await prisma.resource.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete resource' });
    }
};
