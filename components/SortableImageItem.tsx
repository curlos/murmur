import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { XIcon } from '@heroicons/react/outline';

interface SortableImageItemProps {
  id: string;
  image: string;
  index: number;
  onRemove: (index: number) => void;
}

const SortableImageItem: React.FC<SortableImageItemProps> = ({ id, image, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      <div className="relative">
        <button
          type="button"
          aria-label={`Remove image ${index + 1}`}
          className="absolute w-8 h-7 bg-[#1F1814] hover:bg-[#2E2420] bg-opacity-75 rounded-full flex items-center justify-center top-1 right-1 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
        >
          <XIcon className="text-white h-5" />
        </button>
        <img
          src={image}
          alt=""
          className="rounded-2xl max-h-40 w-full object-cover border border-gray-400 dark:border-gray-700 cursor-grab active:cursor-grabbing"
          draggable={false}
          // The focus attributes and key listeners must be on the same element for keyboard reordering (Space, arrow keys, Space) to work.
          {...attributes}
          {...listeners}
          aria-label={`Image ${index + 1}. Press Space to pick up and reorder with the arrow keys.`}
        />
      </div>
    </div>
  );
};

export default SortableImageItem;