import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  MessageCircle,
  User,
  ChevronLeft,
  Send
} from "lucide-react";
import {
  initialForumPosts,
  FORUM_CATEGORIES,
  type ForumPost,
  type ForumComment
} from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const generateId = () => Math.random().toString(36).substring(2, 9);

const savePostsToStorage = (posts: ForumPost[]) => {
  localStorage.setItem("forumPosts", JSON.stringify(posts));
};

const Forum = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLogged = localStorage.getItem("isLogged") === "true";
  const username = user?.name || "Anónimo";

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const storedPosts = localStorage.getItem("forumPosts");
    return storedPosts ? JSON.parse(storedPosts) : initialForumPosts;
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [myPostsOnly, setMyPostsOnly] = useState(false);

  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: FORUM_CATEGORIES[0]
  });

  // FILTRO COMPLETO
  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchUser = !myPostsOnly || p.author === username;

    return matchSearch && matchCategory && matchUser;
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: ForumPost = {
      id: generateId(),
      title: newPost.title,
      author: username,
      category: newPost.category,
      content: newPost.content,
      date: new Date().toISOString().split("T")[0],
      comments: []
    };

    // Reemplaza el setPosts anterior por esto:
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);                     // actualiza el estado
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts)); // guarda en localStorage

    // Limpiar formulario y cerrar diálogo
    setNewPost({
      title: "",
      content: "",
      category: FORUM_CATEGORIES[0]
    });
    setIsNewPostOpen(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: ForumComment = {
      id: generateId(),
      author: username,
      content: newComment,
      date: new Date().toISOString().split("T")[0]
    };

    const updatedPosts = posts.map((p) =>
      p.id === selectedPost.id ? { ...p, comments: [...p.comments, comment] } : p
    );

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts); // <-- guardar

    setSelectedPost((prev) =>
      prev ? { ...prev, comments: [...prev.comments, comment] } : null
    );

    setNewComment("");
  };

  const categoryColors: Record<string, string> = {
    "Dudas sobre el test": "bg-primary/10 text-primary",
    Consejos: "bg-accent/10 text-accent",
    General: "bg-secondary text-secondary-foreground"
  };

  // VISTA DETALLE
  if (selectedPost) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-warm py-8">
          <div className="container max-w-3xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedPost(null)}
              className="mb-4 gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Volver
            </Button>

            <Card>
              <CardHeader>
                <Badge className={`mb-2 w-fit ${categoryColors[selectedPost.category]}`}>
                  {selectedPost.category}
                </Badge>
                <CardTitle>{selectedPost.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {selectedPost.author} · {selectedPost.date}
                </div>
              </CardHeader>

              <CardContent>
                <p>{selectedPost.content}</p>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Comentarios ({selectedPost.comments.length})
                  </h3>

                  {selectedPost.comments.map((c) => (
                    <div key={c.id} className="bg-muted p-3 rounded mb-2">
                      <b>{c.author}</b>: {c.content}
                    </div>
                  ))}

                  {!isLogged && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Estás comentando como anónimo
                    </p>
                  )}

                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Comentario..."
                    />
                    <Button onClick={handleAddComment}>
                      <Send />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  //  VISTA LISTA
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-warm py-8">
        <div className="container">

          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Foro 🐾</h1>

            <Button onClick={() => setIsNewPostOpen(true)}>
              Crear Post
            </Button>
          </div>

          {/* FILTROS */}
          <div className="flex gap-2 mb-4 items-center overflow-x-auto">

            <Input
              className="min-w-[200px] max-w-xs"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* TODOS */}
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              onClick={() => setCategoryFilter("all")}
            >
              Todos
            </Button>

            {/* CATEGORÍAS */}
            {FORUM_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}

            {/* MIS POSTS */}
            {isLogged && (
              <Button
                variant={myPostsOnly ? "default" : "outline"}
                onClick={() => setMyPostsOnly(!myPostsOnly)}
              >
                Mis posts
              </Button>
            )}
          </div>
          {/* Posts */}
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => setSelectedPost(post)}>
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`text-xs ${categoryColors[post.category] || ""}`}>{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="mt-1 font-display font-semibold">{post.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments.length} comentarios</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      {/* CREAR POST */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Post</DialogTitle>
          </DialogHeader>

          <p>Publicando como: {username}</p>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select
              value={newPost.category}
              onValueChange={(v) =>
                setNewPost({ ...newPost, category: v })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORUM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Título"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Contenido"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleCreatePost}>Publicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forum;