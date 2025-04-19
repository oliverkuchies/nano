import { it, expect } from 'vitest'
import { useNano } from './index';
it('should create a state, and it should allow for incrementing multiple times', () => {
    const counter = useNano('counter', 1);
    expect(counter.value).toBe(1);
    counter.value += 1;
    expect(counter.value).toBe(2);
    counter.value += 1;
    expect(counter.value).toBe(3);

    const name = useNano('name', 'bob')
    expect(name.value).toBe('bob');
    name.value = 'george';
    expect(name.value).toBe('george')

    expect(counter.value).toBe(3);
});
