import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { CalendarEvent } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { useVisualViewport } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export function EventEditor() {
  const editor = useAppStore((s) => s.editor);
  const closeEditor = useAppStore((s) => s.closeEditor);
  const saveEditor = useAppStore((s) => s.saveEditor);
  const removeEvent = useAppStore((s) => s.removeEvent);
  const [draft, setDraft] = useState<CalendarEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const vv = useVisualViewport();

  useEffect(() => {
    if (editor.open) {
      setDraft(editor.draft);
      setError(null);
      setConfirmDelete(false);
    } else {
      setDraft(null);
    }
  }, [editor]);

  const open = editor.open && !!draft;
  const isEdit = editor.open && editor.mode === "edit";
  const sheetStyle: CSSProperties = {
    maxHeight: vv.height > 0 ? Math.round(vv.height * 0.92) : undefined,
    bottom: vv.keyboardInset,
  };

  function patch<K extends keyof CalendarEvent>(key: K, value: CalendarEvent[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
    setError(null);
  }

  function save() {
    if (!draft) return;
    const result = saveEditor(draft);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success(isEdit ? "日程已更新" : "日程已添加");
  }

  function del() {
    if (!draft || !isEdit) return;
    removeEvent(draft.id);
    toast("日程已删除");
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { if (!next) closeEditor(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          className="sheet-bottom z-50 flex flex-col overflow-hidden outline-none md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
          aria-describedby={undefined}
          style={sheetStyle}
        >
          <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-border md:hidden" />
          <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
            <Dialog.Title className="font-display text-xl font-semibold">
              {isEdit ? "编辑日程" : "添加日程"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-sm text-muted hover:bg-surface-2 hover:text-fg"
                aria-label="关闭"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          {draft ? (
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
                <Field label="题目">
                  <Input
                    value={draft.title}
                    onChange={(e) => patch("title", e.target.value)}
                    placeholder="例如：深度工作"
                    autoComplete="off"
                    enterKeyHint="next"
                  />
                </Field>
                <Field label="日期">
                  <Input
                    type="date"
                    value={draft.date}
                    onChange={(e) => patch("date", e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="开始">
                    <Input
                      type="time"
                      step={300}
                      value={draft.start}
                      onChange={(e) => patch("start", e.target.value)}
                    />
                  </Field>
                  <Field label="结束">
                    <Input
                      type="time"
                      step={300}
                      value={draft.end}
                      onChange={(e) => patch("end", e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="详细内容">
                  <Textarea
                    value={draft.detail}
                    onChange={(e) => patch("detail", e.target.value)}
                    placeholder="这段时间要做的事、需要避开的打扰…"
                    rows={3}
                  />
                </Field>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
              </div>

              <div className="mt-3 flex shrink-0 flex-col gap-2 pt-1">
                <Button type="submit" size="lg" className="w-full">
                  保存
                </Button>
                {isEdit ? (
                  confirmDelete ? (
                    <div className="flex gap-2">
                      <Button variant="danger" className="min-h-12 flex-1" onClick={del}>
                        确认删除
                      </Button>
                      <Button
                        variant="secondary"
                        className="min-h-12 flex-1"
                        onClick={() => setConfirmDelete(false)}
                      >
                        取消
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="min-h-12 w-full text-danger hover:bg-danger/10"
                      onClick={() => setConfirmDelete(true)}
                    >
                      删除这条日程
                    </Button>
                  )
                ) : null}
              </div>
            </form>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
