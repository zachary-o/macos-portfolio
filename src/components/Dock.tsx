import { dockApps } from "#constants";
import { useRef } from "react";

const Dock: React.FC = () => {
  const dockRef = useRef(null);

  const toggleApp = (app: { id: string; canOpen: boolean }): void => {};

  return (
    <section id="dock">
      <div className="dock-container" ref={dockRef}>
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div className="relative flex justify-center" key={id}>
            <button
              className="dock-icon"
              type="button"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-name={name}
              data-tooltip-delayshow={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img src={`/images/${icon}`} alt="" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Dock;
