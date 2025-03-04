import { useContext, useState } from "react";
import { Modal, Image, Group, ActionIcon, Text, Button } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
} from "@tabler/icons-react";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";

function AdminJelentkezoDokumentumViewer({ previewUrls }) {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { dokumentumLetolt } = useContext(AdminJelentkezokContext);

  const isImage = (url) => /\.(jpe?g|png|gif)$/i.test(url);

  const openModal = (index) => {
    setActiveIndex(index);
    setOpened(true);
  };

  return (
    <>
      <Group spacing="xs" noWrap>
        {previewUrls.map((url, index) => (
          <div
            key={index}
            onClick={() => openModal(index)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: 4,
              width: 174,
              height: 98,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="shadow-md bg-gradient-to-t from-gray-400 to-gray-100"
          >
            {isImage(url) ? (
              <Image
                src={url}
                radius="md"
                width={174}
                height={98}
                fit="cover"
                className="blur-sm"
              />
            ) : (
              <Text size="sm" align="center" className="text-gray-700">
                Nincs előnézet (.pdf)
              </Text>
            )}
          </div>
        ))}
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Dokumentumok"
        centered
        size="lg"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isImage(previewUrls[activeIndex]) ? (
            <Image
              src={previewUrls[activeIndex]}
              radius="md"
              fit="contain"
              style={{ maxWidth: "100%", maxHeight: "70vh" }}
            />
          ) : (
            <Button
              color="lightblue"
              leftIcon={<IconDownload />}
              variant="filled"
              onClick={(e) => {
                e.preventDefault();
                dokumentumLetolt(previewUrls[activeIndex], "dokument.pdf");
              }}
              rel="noopener noreferrer"
            >
              Letöltés
            </Button>
          )}
          {previewUrls.length > 1 && (
            <Group position="apart" mt="md" style={{ width: "100%" }}>
              <ActionIcon
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : previewUrls.length - 1
                  )
                }
                variant="light"
              >
                <IconArrowLeft size={16} />
              </ActionIcon>
              <ActionIcon
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev < previewUrls.length - 1 ? prev + 1 : 0
                  )
                }
                variant="light"
              >
                <IconArrowRight size={16} />
              </ActionIcon>
            </Group>
          )}
        </div>
      </Modal>
    </>
  );
}

export default AdminJelentkezoDokumentumViewer;
