import { Container, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

import { useDeleteMaterialsMutation } from "@/shared/redux/rtk-apis/materials/materials.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

export default function DeleteMaterials({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteMaterials, { isLoading }] = useDeleteMaterialsMutation();

  const handleDelete = async () => {
    try {
      const data = await deleteMaterials(id).unwrap();
      if (data.statusCode === 201) {
        showNotification(NotificationMessage("Success", data.message));
        close();
      }
      if (data.statusCode === 400) {
        showNotification(NotificationMessage("Error", "Failed to delete material"));
      }
    } catch (error) {
      showNotification(NotificationMessage("Error", "Failed to delete material"));
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Material">
        <Container>
          <p> Are you sure you want to delete this Material? </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-green-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={close}
              className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </Container>
      </Modal>

      <button className="w-32 text-left" onClick={open}>
        Delete
      </button>
    </>
  );
}
