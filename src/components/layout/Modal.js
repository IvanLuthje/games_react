import { useEffect, useRef } from "react";

/**
 * Modal reutilizable.
 *
 * Uso:
 *   const [open, setOpen] = useState(false);
 *
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Detalle del juego">
 *     <p>Contenido...</p>
 *   </Modal>
 */
function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    // Evita el scroll del body mientras el modal está abierto
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Cierra el modal solo si se hace click en el fondo, no en el contenido
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="presentation"
      style={styles.overlay}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        style={styles.modal}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={styles.closeButton}
        >
          ×
        </button>

        {title && (
          <h2 id="modal-title" style={styles.title}>
            {title}
          </h2>
        )}

        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    backgroundColor: "#1e1e1e",
    color: "#f2f2f2",
    borderRadius: "10px",
    padding: "1.75rem",
    width: "100%",
    maxWidth: "480px",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: "0.75rem",
    right: "0.9rem",
    background: "none",
    border: "none",
    color: "#f2f2f2",
    fontSize: "1.6rem",
    lineHeight: 1,
    cursor: "pointer",
    padding: "0.25rem",
  },
  title: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1.3rem",
    paddingRight: "1.5rem",
  },
  content: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
};

export default Modal;