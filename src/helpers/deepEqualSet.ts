import _ from 'lodash';

export class DeepEqualSet<T> {
    private map = new Map<string, T[]>();

    private hashKey(item: T): string {
        return JSON.stringify(item, Object.keys(item as object).sort());
    }

    add(item: T): this {
        const key = this.hashKey(item);
        const bucket = this.map.get(key) || [];

        if (!bucket.some(existing => _.isEqual(existing, item))) {
            bucket.push(_.cloneDeep(item));
            this.map.set(key, bucket);
        }

        return this;
    }

    has(item: T): boolean {
        const key = this.hashKey(item);
        const bucket = this.map.get(key);

        return bucket !== undefined &&
            bucket.some(existing => _.isEqual(existing, item));
    }

    delete(item: T): boolean {
        const key = this.hashKey(item);
        const bucket = this.map.get(key);

        if (!bucket) return false;

        const index = bucket.findIndex(existing => _.isEqual(existing, item));
        if (index === -1) return false;

        bucket.splice(index, 1);
        if (bucket.length === 0) {
            this.map.delete(key);
        }

        return true;
    }

    get size(): number {
        let count = 0;
        // Convert iterators to arrays to avoid the downlevelIteration issue
        Array.from(this.map.values()).forEach(bucket => {
            count += bucket.length;
        });
        return count;
    }

    values(): T[] {
        const result: T[] = [];
        // Convert iterators to arrays to avoid the downlevelIteration issue
        Array.from(this.map.entries()).forEach(([_key, bucket]) => {
            result.push(..._.cloneDeep(bucket));
        });
        return result;
    }

    // Fix for the iterator implementation
    [Symbol.iterator](): Iterator<T> {
        // Create an array of all values first to avoid iterator issues
        const allValues = this.values();
        let index = 0;

        return {
            next(): IteratorResult<T> {
                if (index < allValues.length) {
                    return {
                        value: allValues[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined as any,
                        done: true
                    };
                }
            }
        };
    }

    clear(): void {
        this.map.clear();
    }
}

// Serializer - Convert DeepEqualSet to plain object
export const serializeDeepEqualSet = <T>(set: DeepEqualSet<T>): any => {
    return {
        type: 'DeepEqualSet',
        items: set.values() // Get array of all items
    };
};

// Deserializer - Reconstruct DeepEqualSet from plain object
export const deserializeDeepEqualSet = <T>(serialized: any): DeepEqualSet<T> => {
    if (serialized?.type !== 'DeepEqualSet') {
        throw new Error('Invalid serialized DeepEqualSet');
    }

    const set = new DeepEqualSet<T>();
    for (const item of serialized.items) {
        set.add(item);
    }

    return set;
};