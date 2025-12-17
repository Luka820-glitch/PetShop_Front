import { useEffect } from 'react';
import useFetch from '../../Hooks/Fetch/useFetch';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { assignImagesForAnimals } from '../../Redux/slices/AnimalImageSlice';
import type { RootState } from '../../Redux';

export function useResourceData<T extends { id: string }>(resourceUrl: string, label: string) {
  const { response, error, loading } = useFetch<T[]>({
    url: resourceUrl,
    method: 'GET',
  });

  const dispatch = useDispatch();
  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);

 
  useEffect(() => {
    if (error) {
      toast.error(`Failed to load ${label}: ${error.message}`);
    } else if (response && response.length > 0) {
      toast.success(`${label} loaded successfully`);
    } else if (response && response.length === 0) {
      toast.info(`No ${label} available.`);
    }
  }, [error, response, label]);

 
  useEffect(() => {
    if (response) {
      const ids = response.map((item) => item.id);
      dispatch(assignImagesForAnimals(ids));
    }
  }, [response, dispatch]);

  return { data: response, error, loading, imageMap };
}
