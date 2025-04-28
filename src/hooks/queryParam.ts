import { useEffect, useState } from "react";

export function useQueryParam(key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
    // Get the initial value from the URL
    const getQueryParam = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(key) || '';
    };

    const [value, setValue] = useState(getQueryParam());

    // Update URL when value changes
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        if (value) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }

        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, '', newRelativePathQuery);
    }, [key, value]);

    return [value, setValue];
}