"use client";

import { useEffect, useId, useState } from "react";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
import { DonetskPhoneLink } from "@/app/donetsk/DonetskPhoneLink";
import { DonetskSocialLink } from "@/app/donetsk/DonetskSocialLink";
import { MAX_URL, TELEGRAM_URL } from "@/app/lib/contactChannels";
import { ContactDialog } from "./ContactDialog";
import type { ContactModalProps } from "./ContactModal";
import { getLoadedContactModal, loadContactModal } from "./loadContactModal";

/** Keep the full form lazy, but make a slow/failed chunk visible and recoverable. */
export function LazyContactModal(props: ContactModalProps) {
  const [Modal, setModal] = useState(getLoadedContactModal);
  const [failed, setFailed] = useState(false);
  const descriptionId = useId();
  const { isOpen, onClose, variant = "default" } = props;

  useEffect(() => {
    if (!isOpen || Modal || failed) return;
    let active = true;
    loadContactModal().then(
      (component) => { if (active) setModal(() => component); },
      () => { if (active) setFailed(true); },
    );
    return () => { active = false; };
  }, [isOpen, Modal, failed]);

  // Keep the loaded form mounted when closed so its draft is preserved.
  if (Modal) return <Modal {...props} />;
  if (!isOpen) return null;
  const position = `${props.contactCtaPosition ?? "contact_modal"}_loading`;
  const phone = props.callContext?.phone ?? props.contactPhoneHref ?? "+79789380221";
  const phoneLabel = props.callContext?.phone ?? props.contactPhoneLabel ?? "+7 (978) 938-02-21";
  const donetsk = variant === "donetsk";
  const linkClass = "inline-flex min-h-11 items-center justify-center rounded-xl border border-current px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2";
  const phoneProps = { className: linkClass, onClick: onClose, children: `Позвонить ${phoneLabel}` };

  return (
    <ContactDialog isOpen={isOpen} onClose={onClose} title={failed ? "Не удалось открыть форму" : "Связаться с нами"} descriptionId={descriptionId} isSubmitting={false} stepKey={failed ? "load-error" : "loading"} theme={donetsk ? "donetsk" : "default"}>
      <div className={`overflow-y-auto p-4 sm:p-6 ${donetsk ? "text-[#f4f7f5]" : "text-gray-800"}`}>
        <p id={descriptionId} role={failed ? "alert" : "status"} className="mb-4 leading-relaxed">
          {failed ? "Проверьте подключение и попробуйте ещё раз. Также можно позвонить или написать нам." : "Открываем форму… Можно связаться с нами напрямую, не дожидаясь загрузки."}
        </p>
        {failed && <button type="button" className={`${linkClass} mb-4 w-full`} onClick={() => {
          setFailed(false);
        }}>Попробовать ещё раз</button>}
        <div className="flex flex-col gap-3">
          {donetsk
            ? <DonetskPhoneLink href={`tel:${phone}`} ctaPosition={`${position}_phone`} {...phoneProps} />
            : <TrackedPhoneLink phone={phone} trackingId={`${position}_phone`} {...phoneProps} />}
          <div className="grid grid-cols-2 gap-3">
            {([{ network: "telegram", label: "Telegram", href: TELEGRAM_URL }, { network: "max", label: "MAX", href: MAX_URL }] as const).map(({ network, label, href }) => {
              const linkProps = { href, target: "_blank", rel: "noopener noreferrer", className: linkClass, onClick: onClose, children: label, "aria-label": `Написать в ${label} (откроется в новой вкладке)` };
              return donetsk ? <DonetskSocialLink key={network} network={network} ctaPosition={position} {...linkProps} /> : <a key={network} {...linkProps} />;
            })}
          </div>
        </div>
      </div>
    </ContactDialog>
  );
}
