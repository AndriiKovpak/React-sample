import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import * as yup from "yup";
import { DeleteNoteComponent, GetNotesComponent, useCreateNoteMutation, useUpdateNoteMutation } from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { useStoreState } from "../../store/global.store";

interface IFormData {
  note: string;
}
const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  note: yup.string().min(1).required(),
});
const initialValues: IFormData = {
  note: "",
};
export const ClientNotes = () => {
  const { clientId, workspaceId } = useStoreState((state) => state.settings);
  const { skip, take, loadMore } = useSkipPagination(9);
  const [, createNoteFn] = useCreateNoteMutation();
  const [, updateNoteFn] = useUpdateNoteMutation();
  const [editNoteId, setEditNoteId] = useState<string>();
  const { values, isSubmitting, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik<IFormData>({
    initialValues,
    validationSchema,
    onSubmit: async ({ note }) => {
      if (editNoteId) {
        const { error } = await updateNoteFn({ noteId: editNoteId, note });
        if (error) {
          toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
        }
      } else {
        const { error } = await createNoteFn({
          clientId,
          workspaceId,
          note,
        });
        if (error) {
          toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
        }
      }
      resetForm({ values: { ...values, note: "" } });
      setEditNoteId("");
    },
  });
  useToastFormikErrors(errors, touched);
  return (
    <div id="notes-infinite" className="mb-4 bg-white p-4">
      <h2 className="text-primary-base mb-4 text-2xl">Client Notes</h2>
      <div>
        <GetNotesComponent variables={{ skip, take, clientId, search: "" }}>
          {({ data }) => (
            <InfiniteScroll
              dataLength={data?.getNotes.length ?? 0}
              next={loadMore}
              hasMore={(data?.getNotes.length ?? 1) % take === 0}
              loader={<></>}
              endMessage={<></>}
              scrollableTarget="notes-infinite"
            >
              <div>
                {data?.getNotes.map((note) => (
                  <div key={note.id} className="mb-2 flex items-center">
                    {editNoteId === note.id ? (
                      <form onSubmit={handleSubmit}>
                        <input
                          name="note"
                          type="text"
                          className="mb-2 w-full rounded border p-2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.note}
                        />
                        <button type="submit" className="btn">
                          {isSubmitting ? "Updating" : "Save"}
                        </button>
                        <button
                          type="button"
                          className="btn ml-2"
                          onClick={() => {
                            setEditNoteId("");
                            resetForm({ values: { ...values, note: "" } });
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <p className="ml-2">{note.note}</p>
                        <AiFillEdit
                          className="ml-2 cursor-pointer"
                          onClick={() => {
                            setEditNoteId(note.id);
                            resetForm({ values: { note: note.note } });
                          }}
                        ></AiFillEdit>
                        <DeleteNoteComponent>
                          {({ executeMutation }) => (
                            <BsFillTrashFill className="ml-2 cursor-pointer" onClick={() => executeMutation({ noteId: note.id })} />
                          )}
                        </DeleteNoteComponent>
                      </>
                    )}
                  </div>
                ))}
                {data?.getNotes.length === 0 && <p>No Notes found.</p>}
              </div>
            </InfiniteScroll>
          )}
        </GetNotesComponent>
      </div>
      {!editNoteId && (
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              name="note"
              placeholder="Note"
              type="text"
              className="mb-2 w-full rounded border p-2"
              onChange={handleChange}
              value={values.note}
            />
            <button type="submit" className="btn">
              {isSubmitting ? "Submitting" : "Add Note"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
