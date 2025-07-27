// src/hooks/useDraggable.js

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { saveComponentPosition, getComponentPosition } from '../utils/componentPositions';

/**
 * Hook customizado para tornar componentes arrastáveis (draggable)
 * @param {string} componentId - ID único do componente para persistência
 * @param {Object} initialPosition - Posição inicial {x, y}
 * @param {Object} constraints - Limites de movimento {minX, maxX, minY, maxY}
 * @returns {Object} - Objeto com posição atual e handlers de drag
 */
export const useDraggable = (componentId, initialPosition = { x: 0, y: 0 }, constraints = {}) => {
  // Recupera posição salva ou usa inicial
  const savedPosition = getComponentPosition(componentId);
  const [position, setPosition] = useState(savedPosition || initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  /**
   * Aplica constraintes à posição e salva automaticamente
   */
  const applyConstraints = useCallback((newPos) => {
    const { minX = 0, maxX = window.innerWidth - 100, minY = 0, maxY = window.innerHeight - 100 } = constraints;
    
    const constrainedPos = {
      x: Math.max(minX, Math.min(maxX, newPos.x)),
      y: Math.max(minY, Math.min(maxY, newPos.y))
    };

    // Salva posição automaticamente ao aplicar constraints
    if (componentId) {
      saveComponentPosition(componentId, constrainedPos);
    }

    return constrainedPos;
  }, [constraints, componentId]);

  /**
   * Inicia o drag
   */
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { ...position };
    
    // Previne seleção de texto durante drag
    e.preventDefault();
    document.body.style.userSelect = 'none';
  }, [position]);

  /**
   * Move durante o drag
   */
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    const newPosition = {
      x: elementStartPos.current.x + deltaX,
      y: elementStartPos.current.y + deltaY
    };

    setPosition(applyConstraints(newPosition));
  }, [isDragging, applyConstraints]);

  /**
   * Finaliza o drag
   */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  }, []);

  // Event listeners globais para mouse move e up
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Suporte para touch (mobile)
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    startPos.current = { x: touch.clientX, y: touch.clientY };
    elementStartPos.current = { ...position };
    e.preventDefault();
  }, [position]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;

    const newPosition = {
      x: elementStartPos.current.x + deltaX,
      y: elementStartPos.current.y + deltaY
    };

    setPosition(applyConstraints(newPosition));
    e.preventDefault();
  }, [isDragging, applyConstraints]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  /**
   * Reseta posição para inicial
   */
  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  /**
   * Define nova posição programaticamente
   */
  const setNewPosition = useCallback((newPos) => {
    const constrainedPos = applyConstraints(newPos);
    setPosition(constrainedPos);
  }, [applyConstraints]);

  // Atualiza posição no redimensionamento da janela
  useEffect(() => {
    const handleResize = () => {
      // Reaplica constraints com novo tamanho da janela
      setPosition(currentPos => applyConstraints(currentPos));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyConstraints]);

  return {
    position,
    isDragging,
    dragRef,
    resetPosition,
    setNewPosition,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart
    },
    dragStyle: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      cursor: isDragging ? 'grabbing' : 'grab',
      transition: isDragging ? 'none' : 'transform 0.2s ease'
    }
  };
};
