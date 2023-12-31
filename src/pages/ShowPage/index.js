// React
import { useEffect, useState } from 'react';

// Utils
import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import DashboardGarageCanvas from '../../components/DashBoardGarageCanvas';
import CanvasToolBar from '../../components/CanvasToolBar';

// style
import './style.scss';
import CanvasIntroductionModal from '../../components/CanvasIntroductionModal';

function ShowPage() {
  // header toggle buttons
  const [modalOpen, setModalOpen] = useState(true);
  const [action, setAction] = useState('translate');
  const [dreamName, setDreamName] = useState(``);
  const handleChangeAction = (event, newAlignment) => {
    setAction(newAlignment);
  };
  const control = {
    value: action,
    onChange: handleChangeAction,
    exclusive: true,
  };

  const [isLoading, setIsLoading] = useState(false);

  const [garageItems, setGarageItems] = useState([]);

  const removeSpace = (string) => {
    return string.replace(/\s/g, '');
  };

  const addItemIntoCanvas = (image) => {
    const id = uuidv4();
    const newGarageItems = [
      ...garageItems,
      {
        itemId: id,
        url: URL.createObjectURL(image),
        canvasItemId: id,
        position: [0, 1, 0],
        rotation: [0, 0, 0],
        scale: [10, 10, 0.1],
      },
    ];
    setGarageItems(newGarageItems);
  };

  const handleDelete = (id) => {
    const item = garageItems.find((each) => each.canvasItemId === id);
    const index = garageItems.indexOf(item);
    const newList = [...garageItems];
    newList.splice(index, 1);
    setGarageItems(newList);
  };

  const handleMove = (canvasItemId, pos, ro, sc) => {
    setGarageItems(
      garageItems.map((item) => {
        const position =
          item.canvasItemId === canvasItemId ? pos : item.position;
        const rotation =
          item.canvasItemId === canvasItemId ? ro : item.rotation;
        const scale = item.canvasItemId === canvasItemId ? sc : item.scale;
        return {
          ...item,
          isDragging: true,
          position,
          rotation,
          scale,
        };
      })
    );
  };

  function save() {
    // localStorage.setItem('canvas', JSON.stringify(garageItems));
    // imgData = getBase64Image(bannerImage);
  }
  useEffect(() => {
    // try {
    //   const garageItemsString = localStorage.getItem('canvas');
    //   const items = JSON.parse(garageItemsString);
    //   setGarageItems(items ? items : []);
  }, []);

  return (
    <>
      {modalOpen ? (
        <CanvasIntroductionModal
          open={modalOpen}
          setOpen={setModalOpen}
          setDreamName={setDreamName}
        ></CanvasIntroductionModal>
      ) : (
        <div className="canvasPage">
          <header>
            <h1>{dreamName}</h1>
          </header>

          <CanvasToolBar
            control={control}
            addItemIntoCanvas={addItemIntoCanvas}
            setAction={setAction}
            save={save}
          />
          <DashboardGarageCanvas
            action={action}
            items={garageItems}
            handleMove={handleMove}
            handleDelete={handleDelete}
            garageName={undefined}
          ></DashboardGarageCanvas>
        </div>
      )}
    </>
  );
}
export default ShowPage;
function getBase64Image(bannerImage) {
  throw new Error('Function not implemented.');
}
